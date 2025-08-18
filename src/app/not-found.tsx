import { NotFoundPage } from 'nextra-theme-docs';
import db from '../db';

export default async function NotFound() {
  return (
    <NotFoundPage content={db.submitError} labels="broken-link">
      <h1>{db.notFoundHint}</h1>
    </NotFoundPage>
  );
}
