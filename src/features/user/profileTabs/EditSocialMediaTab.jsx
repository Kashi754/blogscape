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
  const [formData, setFormData] = useState(socialMedia || []);

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
    const currentIndex = formData.findIndex(
      (item) => item.name === social.name
    );
    if (currentIndex === -1) {
      setFormData([...formData, social]);
    } else {
      let updatedSocial;
      const socialMediaIndex = socialMedia.findIndex(
        (item) => item.name === social.name
      );

      if (socialMediaIndex !== -1 && socialMedia[socialMediaIndex].url) {
        updatedSocial = socialMedia[socialMediaIndex];
      } else {
        updatedSocial = { ...formData[currentIndex], url: social.url };
      }

      const newFormData = [
        ...formData.slice(0, currentIndex),
        updatedSocial,
        ...formData.slice(currentIndex + 1),
      ];
      setFormData(newFormData);
    }
  };

  const handleRemoveSocial = (name) => {
    setValidated(false);
    const currentIndex = formData.findIndex((item) => item.name === name);
    if (currentIndex === -1) {
      return;
    }
    const updatedSocial = { ...formData[currentIndex], url: null };
    const newFormData = [
      ...formData.slice(0, currentIndex),
      updatedSocial,
      ...formData.slice(currentIndex + 1),
    ];
    setFormData(newFormData);
  };

  const handleChangeSocial = (updatedField) => {
    const { name, value } = updatedField;
    const currentIndex = formData.findIndex((item) => item.name === name);
    if (currentIndex === -1) {
      return;
    }
    const updatedSocial = {
      ...formData[currentIndex],
      url: value,
    };
    const newFormData = [
      ...formData.slice(0, currentIndex),
      updatedSocial,
      ...formData.slice(currentIndex + 1),
    ];
    setFormData(newFormData);
  };

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      id='social-media-form-tab'
      className='tab'
      style={
        formData.some((e) => e.url)
          ? { width: '100%' }
          : { width: 'fit-content' }
      }
    >
      {socialMediaCompanies.map((company) => (
        <SocialMediaCheckForm
          key={company.name}
          company={company}
          checked={formData.some((e) => e.name === company.id && e.url)}
          handleAddSocial={handleAddSocial}
          handleRemoveSocial={handleRemoveSocial}
          handleChangeSocial={handleChangeSocial}
          socialUrl={formData.find((e) => e.name === company.id)?.url}
          validated={validated}
        />
      ))}
    </Form>
  );
}
