import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import FormContainer from '@/components/FormContainer';
import Form from '@/components/Form';
import Input from '@/components/Input';
import Label from '@/components/Label';
import InputGroup from '@/components/InputGroup';
import SubmitButton from '@/components/SubmitButton';

export default function AddJobPage() {
     const { data: session } = useSession({required: false});
    const router = useRouter();
    
    const [formData, setFormData] = useState({
        company: '',
        position: '',
        status: 'Applied'
    });

    const handleSubmit = async(e) => {
        e.preventDefault();
    console.log('Would send to API:', formData);
    alert('Job added (will save to database later)');
    router.push('/jobs');
    }

    // if(!session){
    //     router.push('/auth/login');
    // }

    return (
    <FormContainer>
      <h1>Add New Job Application</h1>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>Company</Label>
          <Input 
            type="text" 
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            required
          />
        </InputGroup>

        <InputGroup>
          <Label>Position</Label>
          <Input 
            type="text" 
            value={formData.position}
            onChange={(e) => setFormData({...formData, position: e.target.value})}
            required
          />
        </InputGroup>

        <InputGroup>
          <Label>Status</Label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </InputGroup>

        <SubmitButton type="submit">Save Application</SubmitButton>
      </Form>
    </FormContainer>
  );
}
