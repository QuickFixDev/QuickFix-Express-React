import axios from 'axios';

export const handleFormSubmit = async (formData) => {
    const response = await axios.post('/submit-form', {
        hidden_data: formData.get('hidden_data'),
        shown_data: formData.get('shown_data'),
    });
    
    return response.data;
}
