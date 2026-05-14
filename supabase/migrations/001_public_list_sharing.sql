-- Ejecuta este SQL en Supabase → SQL Editor (una vez).
-- Permite que cualquiera con el enlace vea una lista marcada como pública (is_public = true).

ALTER TABLE top5_lists
  ADD COLUMN IF NOT EXISTS is_public boolean NOT NULL DEFAULT false;

ALTER TABLE top5_lists ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "top5_auth_select_own" ON top5_lists;
CREATE POLICY "top5_auth_select_own"
  ON top5_lists
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Lectura anónima: solo filas públicas (visitantes sin cuenta).
DROP POLICY IF EXISTS "top5_anon_select_public" ON top5_lists;
CREATE POLICY "top5_anon_select_public"
  ON top5_lists
  FOR SELECT
  TO anon
  USING (is_public = true);

-- Usuarios logueados pueden leer listas públicas de otros.
DROP POLICY IF EXISTS "top5_auth_select_public_others" ON top5_lists;
CREATE POLICY "top5_auth_select_public_others"
  ON top5_lists
  FOR SELECT
  TO authenticated
  USING (is_public = true);

-- Insertar solo como uno mismo.
DROP POLICY IF EXISTS "top5_auth_insert_own" ON top5_lists;
CREATE POLICY "top5_auth_insert_own"
  ON top5_lists
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Borrar solo lo propio.
DROP POLICY IF EXISTS "top5_auth_delete_own" ON top5_lists;
CREATE POLICY "top5_auth_delete_own"
  ON top5_lists
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Permitir al dueño editar (p. ej. is_public).
DROP POLICY IF EXISTS "top5_auth_update_own" ON top5_lists;
CREATE POLICY "top5_auth_update_own"
  ON top5_lists
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Si al crear o borrar listas ves "permission denied", abre Table Editor → top5_lists → RLS
-- y elimina políticas duplicadas o en conflicto con las de arriba.
