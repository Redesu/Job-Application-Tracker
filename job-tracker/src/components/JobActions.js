
import Link from 'next/link';
import Button from '@/components/Button';



export default function JobActions({ job, onDelete }) {


    return (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Link href={`/jobs/edit/${job.id || job._id}`}>
                <Button variant="edit"><i className='bi bi-pencil-square' style={{ marginRight: '4px' }}>Edit</i></Button>
            </Link>
            <Button variant="delete" onClick={() => onDelete(job.id || job._id)} style={{ minWidth: '50px' }}>
                <i className='bi bi-trash' style={{ marginRight: '4px' }}>Delete</i>
            </Button>
        </div>
    )
}