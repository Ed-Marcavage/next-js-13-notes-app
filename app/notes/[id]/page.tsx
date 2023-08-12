import styles from '../Notes.module.css';

async function getNote(noteId: string) {
    const res = await fetch(
        `http://127.0.0.1:8090/api/collections/example/records/${noteId}`, // dynamic routes wont auto cache request
        {
            next: { revalidate: 10 }, // ISR - Incremental Static Regeneration - revalidate every 10 seconds
        }
    );
    const data = await res.json();
    return data;
}

export default async function NotePage({ params }: any) { // params is from URL (ID)
    const note = await getNote(params.id);

    return (
        <div>
            <h1>notes/{note.id}</h1>
            <div className={styles.note}>
                <h3>{note.title}</h3>
                <h5>{note.content}</h5>
                <p>{note.created}</p>
            </div>
        </div>
    );
}