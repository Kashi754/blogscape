import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { SocialMediaCheckForm } from '../../../components/SocialMediaCheckForm/SocialMediaCheckForm';
import { useSelector } from 'react-redux';
import { selectUser } from '../userSlice';

const socialMediaCompanies = [
  {
    name: 'Facebook',
    id: 'facebook',
    link: 'https://www.facebook.com',
  },
  {
    name: 'Twitter',
    id: 'twitter',
    link: 'https://twitter.com',
  },
  {
    name: 'Instagram',
    id: 'instagram',
    link: 'https://www.instagram.com',
  },
  {
    name: 'Tiktok',
    id: 'tiktok',
    link: 'https://www.tiktok.com',
  },
  {
    name: 'Youtube',
    id: 'youtube',
    link: 'https://www.youtube.com',
  },
  {
    name: 'Github',
    id: 'github',
    link: 'https://github.com',
  },
  {
    name: 'Twitch',
    id: 'twitch',
    link: 'https://www.twitch.tv',
  },
  {
    name: 'Discord',
    id: 'discord',
    link: 'https://discord.com',
  },
];

export function EditSocialMediaTab({ onSubmit }) {
  const [validated, setValidated] = useState(false);
  const { socialMedia } = useSelector(selectUser);
  const [formData, setFormData] = useState(socialMedia || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    if (JSON.stringify(formData) === JSON.stringify(socialMedia)) {
      e.stopPropagation();
      return;
    }

    setValidated(false);
    onSubmit({ key: 'socialMedia', formData });
  };

  const handleAddSocial = (social) => {
    setFormData((prev) => ({ ...prev, [social.name]: social.url }));
  };

  const handleRemoveSocial = (name) => {
    setValidated(false);
    setFormData((prev) => ({ ...prev, [name]: null }));
  };

  const handleChangeSocial = (updatedField) => {
    const { name, value } = updatedField;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(updatedField);
  };

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      id='social-media-form-tab'
      className='tab'
      style={
        Object.values(formData).every((value) => value !== null)
          ? { width: '100%' }
          : { width: 'fit-content' }
      }
    >
      {socialMediaCompanies.map((company) => (
        <SocialMediaCheckForm
          key={company.name}
          company={company}
          checked={formData[company.id] !== null}
          handleAddSocial={handleAddSocial}
          handleRemoveSocial={handleRemoveSocial}
          handleChangeSocial={handleChangeSocial}
          socialUrl={formData[company.id]}
          validated={validated}
        />
      ))}
    </Form>
  );
}
