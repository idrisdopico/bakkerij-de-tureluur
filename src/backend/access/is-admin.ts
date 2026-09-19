import type { Access } from 'payload';

/**
 * Every collection/global in this app checks writes through this one
 * function rather than inlining `Boolean(req.user)` per-config — there's
 * only one admin account for now (see AGENTS.md), so "logged in" and "is
 * admin" are the same thing today, but every write-access check already
 * depends on this single abstraction. If roles are ever introduced (e.g. a
 * second staff account limited to certain sections), this is the only file
 * that needs to change — no collection/global config does.
 */
export const isAdmin: Access = ({ req: { user } }) => Boolean(user);
