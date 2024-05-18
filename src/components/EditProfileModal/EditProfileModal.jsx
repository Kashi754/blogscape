import { Button, Modal, Tab, Tabs } from 'react-bootstrap';
import { EditProfileTab } from '../../features/user/profileTabs/EditProfileTab';
import { ChangePasswordTab } from '../../features/user/profileTabs/ChangePasswordTab';
import { EditSocialMediaTab } from '../../features/user/profileTabs/EditSocialMediaTab';
import { EditBlogTab } from '../../features/user/profileTabs/EditBlogTab';
import { useState } from 'react';
import './EditProfileModal.css';
import { useSubmit } from 'react-router-dom';

export function EditProfileModal() {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);
  const [key, setKey] = useState('profile');
  const submit = useSubmit();

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      setVisible(false);
      setKey('profile');
    }, 500);
  };
  const handleShow = () => {
    setVisible(true);
    setShow(true);
  };

  const handleSubmit = (formData) => {
    // setShow(false);
    // setVisible(false);

    submit(formData, {
      method: 'put',
      encType: 'application/json',
      action: '/profile',
    });
  };

  return (
    <>
      <Button
        variant='secondary'
        onClick={handleShow}
        className='edit-profile-btn'
        size='lg'
      >
        Edit Profile
      </Button>

      {visible && (
        <Modal
          show={show}
          onHide={handleClose}
          size='lg'
          dialogClassName='modal-fullscreen-sm-down'
          contentClassName='modal-content'
          centered
          fullscreen='sm-down'
          scrollable
        >
          <Modal.Header closeButton>
            <Modal.Title>{key}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Tabs
              id='edit-profile-tabs'
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className='edit-profile-tabs'
              defaultActiveKey='profile'
              justify
            >
              <Tab
                eventKey='profile'
                title='Edit Profile'
              >
                <EditProfileTab onSubmit={handleSubmit} />
              </Tab>

              <Tab
                eventKey='password'
                title='Change Password'
              >
                <ChangePasswordTab onSubmit={handleSubmit} />
              </Tab>

              <Tab
                eventKey='social-media'
                title='Social Media'
              >
                <EditSocialMediaTab onSubmit={handleSubmit} />
              </Tab>

              <Tab
                eventKey='blog'
                title='Edit Blog'
              >
                <EditBlogTab onSubmit={handleSubmit} />
              </Tab>
            </Tabs>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant='secondary'
              size='lg'
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              variant='primary'
              size='lg'
              type='submit'
              form={key + '-form-tab'}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
