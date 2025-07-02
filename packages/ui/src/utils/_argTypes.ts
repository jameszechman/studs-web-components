export const size = {
  size: {
    control: { type: 'select', defaultValue: 'medium' },
    options: ['default', 'small', 'medium', 'large'],
    defaultValue: { summary: 'medium' }
  }
};
export const contentDirection = {
  contentDirection: {
    control: { type: 'select' },
    options: ['default', 'inline', 'block']
  }
};
export const icon = {
  icon: {
    control: {
      type: 'text'
    },
    description: `Define display icon (class) of the button component using html svg or font icon`
  }
};
export const variants = ({
                           name = 'variant',
                           options = [],
                           defaultValue = '',
                           description=''
                         }: {
  name?: string;
  options?: string[];
  defaultValue?: string;
  description?: string;
}) => {
  return {
    [name]: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', ...options],
      defaultValue: defaultValue,
      description: description
    }
  };
};
export const position = {
  position: {
    control: { type: 'select' },
    options: [
      'default',
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end'
    ]
  }
};

export const formArgs = {
  name: { control: 'text' },
  placeholder: { control: 'text' },
  status: {
    control: { type: 'select' },
    options: ['default', null, 'error', 'success', 'warning']
  },
  disabled: { control: 'boolean' },
  required: { control: 'boolean' }
};