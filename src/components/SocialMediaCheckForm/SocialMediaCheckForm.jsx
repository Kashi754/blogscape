import { Form, InputGroup } from 'react-bootstrap';
import './SocialMediaCheckForm.css';
import { isURL } from 'validator';

export function SocialMediaCheckForm({
  company,
  checked,
  handleAddSocial,
  handleRemoveSocial,
  handleChangeSocial,
  socialUrl,
  validated,
}) {
  let socialValue = '';

  if (socialUrl) {
    socialValue = new URL(socialUrl).pathname.slice(1);
  }

  const handleCheck = () => {
    if (!checked) {
      handleAddSocial({
        name: company.id,
        url: company.link + '/',
      });
    } else {
      handleRemoveSocial(company.id);
    }
  };

  return (
    <Form.Group
      className='social-media-group'
      controlId={`social-media-${company.name}`}
    >
      <Form.Group
        className='form-switch-group'
        name={company.name}
      >
        <Form.Check.Label>{company.name}</Form.Check.Label>
        <Form.Check
          type='switch'
          name={company.icon}
          checked={checked}
          id={`social-media-${company.id}`}
          onChange={handleCheck}
        />
      </Form.Group>

      <InputGroup
        style={
          !checked
            ? {
                width: 0,
                height: 0,
                overflow: 'hidden',
                flex: 0,
              }
            : {}
        }
        className='social-media-input-group'
      >
        <InputGroup.Text
          id={company.name + '-input'}
          className='input-prefix'
        >
          {company.link + '/'}
        </InputGroup.Text>
        <Form.Control
          type='text'
          name={company.name}
          placeholder='path/to/profile'
          aria-describedby={company.name + '-input'}
          className='social-media-input'
          required={checked}
          isInvalid={
            validated &&
            checked &&
            !socialValue &&
            !isURL(socialUrl, {
              require_protocol: true,
              allow_fragments: false,
              allow_query_components: false,
            })
          }
          value={socialValue}
          onChange={(e) =>
            handleChangeSocial({
              name: company.id,
              value: company.link + '/' + e.target.value,
            })
          }
        />
        {checked && (
          <Form.Control.Feedback
            type='invalid'
            data-test='invalid-path'
          >
            Please enter a valid path!
          </Form.Control.Feedback>
        )}
      </InputGroup>
    </Form.Group>
  );
}
