import { NotFoundPage } from "nextra-theme-docs";
import Database from '@/data/db.json';

export default async function NotFound() {
  return (
    <NotFoundPage content={Database.submitError} labels="broken-link">
      <h1>{Database.notFoundHint}</h1>
    </NotFoundPage>
  );
}
