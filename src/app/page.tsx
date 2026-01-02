import { AppShell } from '@/components/layout/AppShell';
import { TodoList } from '@/components/todos/TodoList';
import { KanbanBoard } from '@/components/kanban/KanbanBoard';
import { NotesArea } from '@/components/notes/NotesArea';

export default function Home() {
  return (
    <AppShell sidebar={<TodoList />}>
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-border-subtle/50 flex-shrink-0">
          <div className="flex items-center gap-4">
            {/* Logo/Brand */}
            <div className="relative">
              <h1 className="font-display font-extrabold text-xl tracking-tight">
                <span className="text-gradient">VIBE</span>
                <span className="text-text-bright ml-1">BOARD</span>
              </h1>
              {/* Subtle glow under logo */}
              <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-neon-cyan/40 via-neon-purple/30 to-transparent" />
            </div>
          </div>

          {/* Right side - could add user menu, settings, etc. */}
          <div className="flex items-center gap-3">
            {/* Status indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-elevated/60 border border-border-subtle">
              <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
              <span className="text-xs text-text-secondary font-body">Synced</span>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          {/* Kanban Board */}
          <section>
            <KanbanBoard />
          </section>

          {/* Notes Area */}
          <section className="px-6 pb-6">
            <NotesArea />
          </section>
        </div>

        {/* Decorative footer line */}
        <div className="h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
      </div>
    </AppShell>
  );
}
