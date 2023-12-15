import React from 'react';
import ClickHandlerExample from '../components/other/ClickHandlerExample';
import ChangeHandlerExample from '../components/other/ChangeHandlerExample';
import FormSubmissionHandlerExample from '../components/other/FormSubmissionHandlerExample';
import FocusHandlerExample from '../components/other/FocusHandlerExample';
import BlurHandlerExample from '../components/other/BlurHandlerExample';
import MouseOverHandlerExample from '../components/other/MouseOverHandlerExample';
import KeyPressHandlerExample from '../components/other/KeyPressHandlerExample';
import DefaultPropsComponent from '../components/other/DefaultPropsComponent'

function EventHandlersPage() {
  return (
    <div>
      <h1>Event Handlers Examples</h1>

      <ClickHandlerExample />

      <hr />

      <ChangeHandlerExample />

      <hr />

      <FormSubmissionHandlerExample />

      <hr />

      <FocusHandlerExample />

      <hr />

      <BlurHandlerExample />

      <hr />

      <MouseOverHandlerExample />

      <hr />

      <KeyPressHandlerExample />

      <hr />
      <DefaultPropsComponent text="Hello world" />
      <hr />
      <DefaultPropsComponent />
    </div>
  );
}

export default EventHandlersPage;