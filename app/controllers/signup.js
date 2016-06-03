import Ember from 'ember';

export default Ember.Controller.extend({
  bunsenModel: {
    properties: {
      email: {
        format: 'email',
        type: 'string'
      },
      name: {
        properties: {
          first: {type: 'string'},
          last: {type: 'string'}
        },
        required: ['first', 'last'],
        type: 'object'
      },
      password: {
        type: 'string'
      }
    },
    required: ['email', 'name', 'password'],
    type: 'object'
  },
  bunsenValue: null,
  bunsenView: {
    containers: [
      {
        id: 'main',
        rows: [
          [
            {
              model: 'name',
              renderer: 'name-renderer'
            }
          ],
          [
            {
              model: 'email'
            }
          ],
          [
            {
              model: 'password',
              properties: {
                type: 'password' // Render input as a password input instead of default text input
              }
            }
          ]
        ]
      }
    ],
    rootContainers: [
      {
        container: 'main',
        label: 'Main'
      }
    ],
    type: 'form',
    version: '1.0'
  },
  isFormDisabled: false,
  isFormInvalid: true,

  actions: {
    formChange (value) {
      this.set('bunsenValue', value);
    },
    formValidation (validation) {
      this.set('isFormInvalid', validation.errors.length !== 0);
    },
    submitForm () {
      this.set('isFormDisabled', true);

      Ember.run.later(() => {
        const value = this.get('bunsenValue');
        alert(JSON.stringify(value, null, 2));
        this.set('isFormDisabled', false);
      }, 3000);
    }
  }
});
