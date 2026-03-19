"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { createBrowserSupabaseClient } from "@/lib/supabase-browser";
import { useTheme } from "@/context/ThemeContext";

type GalleryImage = {
    id: string;
    imageUrl: string;
};

type GalleryProject = {
    id: string;
    titleEn: string;
    titleAm: string;
    createdAt: string;
    images: GalleryImage[];
};

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000";

export default function GalleryAdminPage() {
    const { isDark } = useTheme();
    const [supabase, setSupabase] = useState<ReturnType<typeof createBrowserSupabaseClient> | null>(null);
    const [sessionToken, setSessionToken] = useState<string | null>(null);
    const [adminEmail, setAdminEmail] = useState<string | null>(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState<string | null>(null);

    const [projects, setProjects] = useState<GalleryProject[]>([]);
    const [loadingProjects, setLoadingProjects] = useState(false);

    const [titleEn, setTitleEn] = useState("");
    const [titleAm, setTitleAm] = useState("");
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [images, setImages] = useState<File[]>([]);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
    const [editingTitleEn, setEditingTitleEn] = useState("");
    const [editingTitleAm, setEditingTitleAm] = useState("");

    const loadProjects = useCallback(async (token: string) => {
        setLoadingProjects(true);

        try {
            const response = await fetch(`${backendUrl}/api/admin/gallery/projects`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                cache: "no-store"
            });

            const payload = await response.json();

            if (!response.ok) {
                throw new Error(payload.error ?? "Failed to load projects.");
            }

            setProjects(payload.projects ?? []);
        } catch (error) {
            setAuthError(error instanceof Error ? error.message : "Failed to load projects.");
        } finally {
            setLoadingProjects(false);
        }
    }, []);

    useEffect(() => {
        try {
            setSupabase(createBrowserSupabaseClient());
        } catch (error) {
            setAuthError(error instanceof Error ? error.message : "Supabase is not configured.");
        }
    }, []);

    useEffect(() => {
        if (!supabase) return;

        void supabase.auth.getSession().then(({ data }) => {
            setSessionToken(data.session?.access_token ?? null);
            setAdminEmail(data.session?.user?.email ?? null);
        });

        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSessionToken(session?.access_token ?? null);
            setAdminEmail(session?.user?.email ?? null);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    useEffect(() => {
        if (!sessionToken) {
            setProjects([]);
            return;
        }

        void loadProjects(sessionToken);
    }, [sessionToken, loadProjects]);

    const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!supabase) return;

        setAuthError(null);

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setAuthError(error.message);
            return;
        }

        setPassword("");
    };

    const signOut = async () => {
        if (!supabase) return;

        await supabase.auth.signOut();
        setSessionToken(null);
        setAdminEmail(null);
        setProjects([]);
    };

    const createProject = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!sessionToken) return;

        if (!thumbnail) {
            setMessage("Please choose a thumbnail image.");
            return;
        }

        setSaving(true);
        setMessage(null);

        try {
            const formData = new FormData();
            formData.append("titleEn", titleEn.trim());
            formData.append("titleAm", titleAm.trim());
            formData.append("thumbnail", thumbnail);
            images.forEach((image) => formData.append("images", image));

            const response = await fetch(`${backendUrl}/api/admin/gallery/projects`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                },
                body: formData
            });

            const payload = await response.json();

            if (!response.ok) {
                throw new Error(payload.error ?? "Failed to create project.");
            }

            setTitleEn("");
            setTitleAm("");
            setThumbnail(null);
            setImages([]);
            setMessage("Project uploaded successfully.");
            await loadProjects(sessionToken);
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "Failed to create project.");
        } finally {
            setSaving(false);
        }
    };

    const beginEdit = (project: GalleryProject) => {
        setEditingProjectId(project.id);
        setEditingTitleEn(project.titleEn);
        setEditingTitleAm(project.titleAm);
    };

    const saveEdit = async () => {
        if (!sessionToken || !editingProjectId) return;

        setSaving(true);
        setMessage(null);

        try {
            const response = await fetch(`${backendUrl}/api/admin/gallery/projects/${editingProjectId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionToken}`
                },
                body: JSON.stringify({ titleEn: editingTitleEn, titleAm: editingTitleAm })
            });

            const payload = await response.json();

            if (!response.ok) {
                throw new Error(payload.error ?? "Failed to update project.");
            }

            setEditingProjectId(null);
            setMessage("Project updated.");
            await loadProjects(sessionToken);
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "Failed to update project.");
        } finally {
            setSaving(false);
        }
    };

    const deleteProject = async (projectId: string) => {
        if (!sessionToken) return;
        if (!window.confirm("Delete this project and all its images?")) return;

        setSaving(true);
        setMessage(null);

        try {
            const response = await fetch(`${backendUrl}/api/admin/gallery/projects/${projectId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${sessionToken}`
                }
            });

            const payload = await response.json();

            if (!response.ok) {
                throw new Error(payload.error ?? "Failed to delete project.");
            }

            setMessage("Project deleted.");
            await loadProjects(sessionToken);
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "Failed to delete project.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <main className={`min-h-screen pt-28 pb-16 px-4 ${isDark ? "bg-neutral-950 text-white" : "bg-white text-black"}`}>
            <div className="mx-auto max-w-7xl space-y-8">
                <section className={`relative overflow-hidden rounded-3xl border p-6 md:p-10 ${isDark ? "border-white/10 bg-gradient-to-br from-neutral-900 to-black" : "border-black/10 bg-gradient-to-br from-neutral-100 to-white"}`}>
                    <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(circle_at_80%_20%,rgba(139,69,19,0.35),transparent_35%)]" />
                    <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className={`text-xs uppercase tracking-[0.35em] ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>
                                Teme Control Room
                            </p>
                            <h1 className="mt-2 text-4xl md:text-6xl font-bold tracking-tighter">Gallery Admin</h1>
                            <p className={`mt-3 text-sm md:text-base max-w-2xl ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                                Upload projects, update titles, and keep your showcase fresh with a workflow that matches the rest of your site.
                            </p>
                        </div>

                        {sessionToken && (
                            <div className="space-y-2 md:text-right">
                                <p className={`text-xs uppercase tracking-[0.2em] ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>
                                    Signed In
                                </p>
                                <p className="text-sm">{adminEmail ?? "Unknown user"}</p>
                                <Button variant="outline" className="text-xs" onClick={signOut}>
                                    Logout
                                </Button>
                            </div>
                        )}
                    </div>
                </section>

                {!sessionToken ? (
                    <section className={`rounded-3xl border p-6 md:p-8 max-w-xl ${isDark ? "border-white/10 bg-neutral-900/70" : "border-black/10 bg-neutral-50"}`}>
                        <h2 className="text-2xl font-semibold tracking-tight">Admin Login</h2>
                        <p className={`mt-1 text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                            Use your approved Supabase account to access project management.
                        </p>

                        <form className="mt-6 space-y-4" onSubmit={signIn}>
                            <label className="block space-y-2">
                                <span className={`text-xs uppercase tracking-[0.2em] ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>
                                    Email
                                </span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="admin@teme.com"
                                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${isDark ? "border-white/10 bg-black/40 focus:border-white/30" : "border-black/15 bg-white focus:border-black/40"}`}
                                    required
                                />
                            </label>
                            <label className="block space-y-2">
                                <span className={`text-xs uppercase tracking-[0.2em] ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>
                                    Password
                                </span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    placeholder="Enter your password"
                                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${isDark ? "border-white/10 bg-black/40 focus:border-white/30" : "border-black/15 bg-white focus:border-black/40"}`}
                                    required
                                />
                            </label>

                            <Button variant="primary" className="text-xs" type="submit">
                                Login To Admin
                            </Button>
                        </form>
                    </section>
                ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.3fr] gap-6">
                        <section className={`rounded-3xl border p-6 md:p-8 ${isDark ? "border-white/10 bg-neutral-900/70" : "border-black/10 bg-neutral-50"}`}>
                            <h2 className="text-2xl font-semibold tracking-tight">Create Project</h2>
                            <p className={`mt-1 text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                                Add both English and Amharic titles with one hero image and optional extra photos.
                            </p>

                            <form className="mt-6 space-y-4" onSubmit={createProject}>
                                <input
                                    value={titleEn}
                                    onChange={(event) => setTitleEn(event.target.value)}
                                    placeholder="Title (English)"
                                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${isDark ? "border-white/10 bg-black/40 focus:border-white/30" : "border-black/15 bg-white focus:border-black/40"}`}
                                    required
                                />
                                <input
                                    value={titleAm}
                                    onChange={(event) => setTitleAm(event.target.value)}
                                    placeholder="Title (Amharic)"
                                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${isDark ? "border-white/10 bg-black/40 focus:border-white/30" : "border-black/15 bg-white focus:border-black/40"}`}
                                    required
                                />

                                <div className="space-y-2">
                                    <p className={`text-xs uppercase tracking-[0.2em] ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>
                                        Thumbnail
                                    </p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => setThumbnail(event.target.files?.[0] ?? null)}
                                        className="text-sm"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <p className={`text-xs uppercase tracking-[0.2em] ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>
                                        Additional Images
                                    </p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={(event) => setImages(Array.from(event.target.files ?? []))}
                                        className="text-sm"
                                    />
                                </div>

                                <Button variant="primary" className="text-xs" disabled={saving} type="submit">
                                    {saving ? "Saving..." : "Upload Project"}
                                </Button>
                            </form>
                        </section>

                        <section className={`rounded-3xl border p-6 md:p-8 ${isDark ? "border-white/10 bg-neutral-900/70" : "border-black/10 bg-neutral-50"}`}>
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-semibold tracking-tight">Project Library</h2>
                                    <p className={`mt-1 text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                                        Total projects: {projects.length}
                                    </p>
                                </div>
                            </div>

                            {loadingProjects ? (
                                <p className={`mt-6 text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                                    Loading projects...
                                </p>
                            ) : projects.length === 0 ? (
                                <p className={`mt-6 text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                                    No projects yet. Upload your first showcase entry.
                                </p>
                            ) : (
                                <div className="mt-6 space-y-4">
                                    {projects.map((project) => (
                                        <article key={project.id} className={`rounded-2xl border p-4 ${isDark ? "border-white/10 bg-black/30" : "border-black/10 bg-white"}`}>
                                            {editingProjectId === project.id ? (
                                                <div className="space-y-3">
                                                    <input
                                                        value={editingTitleEn}
                                                        onChange={(event) => setEditingTitleEn(event.target.value)}
                                                        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none ${isDark ? "border-white/10 bg-black/40" : "border-black/15 bg-white"}`}
                                                    />
                                                    <input
                                                        value={editingTitleAm}
                                                        onChange={(event) => setEditingTitleAm(event.target.value)}
                                                        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none ${isDark ? "border-white/10 bg-black/40" : "border-black/15 bg-white"}`}
                                                    />
                                                    <div className="flex flex-wrap gap-2">
                                                        <Button variant="primary" className="text-xs" onClick={saveEdit} type="button">
                                                            Save
                                                        </Button>
                                                        <Button variant="outline" className="text-xs" onClick={() => setEditingProjectId(null)} type="button">
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                                    <div className="flex gap-4 items-center">
                                                        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-white/10">
                                                            <Image
                                                                src={project.images[0]?.imageUrl ?? "/photos/hero.webp"}
                                                                alt={project.titleEn}
                                                                fill
                                                                sizes="96px"
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold text-lg leading-tight">{project.titleEn}</h3>
                                                            <p className={`text-sm ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>{project.titleAm}</p>
                                                            <p className={`text-xs mt-1 ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>
                                                                {project.images.length} images • {new Date(project.createdAt).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap gap-2">
                                                        <Button variant="outline" className="text-xs" onClick={() => beginEdit(project)} type="button">
                                                            Edit Titles
                                                        </Button>
                                                        <button
                                                            className={`inline-flex items-center justify-center px-5 py-3 text-xs font-semibold tracking-widest uppercase rounded-full border transition ${isDark ? "border-red-400/40 text-red-300 hover:bg-red-500/15" : "border-red-300 text-red-700 hover:bg-red-50"}`}
                                                            onClick={() => deleteProject(project.id)}
                                                            type="button"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </article>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                )}

                {authError && (
                    <p className={`rounded-2xl border px-4 py-3 text-sm ${isDark ? "border-red-500/30 bg-red-500/10 text-red-200" : "border-red-200 bg-red-50 text-red-700"}`}>
                        {authError}
                    </p>
                )}
                {message && (
                    <p className={`rounded-2xl border px-4 py-3 text-sm ${isDark ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
                        {message}
                    </p>
                )}
            </div>
        </main>
    );
}
