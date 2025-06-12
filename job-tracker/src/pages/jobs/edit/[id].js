import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import FormContainer from '@/components/FormContainer';
import Form from '@/components/Form';
import Input from '@/components/Input';
import Label from '@/components/Label';
import InputGroup from '@/components/InputGroup';
import SubmitButton from '@/components/SubmitButton';
import AuthGuard from '@/components/AuthGuard';
import { authFetch } from '@/lib/api';
import Button from '@/components/Button';

export default function EditJobPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const { id } = router.query;
    
    const [formData, setFormData] = useState({
        company:'',
        position:'',
        status: 'Applied'
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobData = async () => {
            if (!id || !session) return;

            try {
                const response = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`, { session });
                if (!response.ok) {
                    throw new Error('Failed to fetch job data');
                }
                const data = await response.json();
                setFormData(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError(err.message);
                setLoading(false);
            }
        };
        fetchJobData();
    }, [id, session]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`, {
            session,
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            ...formData,
            userId: session.userId
            }),
        });
    
        if (!response.ok) {
            throw new Error('Failed to update job');
        } else {
            alert('Job updated successfully');
            router.push('/jobs');
        }
        } catch (error) {
        console.error(error);
        alert(error.message);
        }
    }
    
    return (
        <FormContainer>
        <AuthGuard>
            <h1>Edit Job Application</h1>
            <Form onSubmit={handleSubmit}>
            <InputGroup>
                <Label>Company</Label>
                <Input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
                />
            </InputGroup>
            <InputGroup>
                <Label>Position</Label>
                <Input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                required
                />
            </InputGroup>
            <InputGroup>
                <Label>Status</Label>
                <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
                </select>
            </InputGroup>
            <Button variant="submit" type="submit">Update Job</Button>
            <Button variant="cancel" onClick={() => router.push('/jobs')}>Cancel</Button>
            </Form>
        </AuthGuard>
        </FormContainer>
    );

}