module.exports = function(plop) {
  plop.addPrompt('directory', require('inquirer-directory'));

	plop.setGenerator('class', {
    description: 'A service or model class, to  e.g., to communicate to your API',
    prompts: [{
      type: 'input',
      name: 'name',
      message: "Name of the class (i.e. 'user')?"
    },
    {
      type: 'directory',
      name: 'path',
      basePath: './',
      message: "Location for the class?"
    }],

    actions: [{
      type: 'add',
      path: '../{{path}}/{{dashCase name}}/{{dashCase name}}.tsx',
      templateFile: 'templates/class/class.template'
    },
    {
      type: 'add',
      path: '../{{path}}/{{dashCase name}}/{{dashCase name}}.spec.tsx',
      templateFile: 'templates/class/class.spec.template'
    }]
  });

  plop.setGenerator('component', {
    description: 'A component',
    prompts: [{
      type: 'input',
      name: 'name',
      message: "Name of the component (i.e. 'user')?"
    },
    {
      type: 'directory',
      name: 'path',
      basePath: './',
      message: "Location for the component?"
    }],

    actions: [{
      type: 'add',
      path: '../{{path}}/{{dashCase name}}/{{dashCase name}}.tsx',
      templateFile: 'templates/component/component.template'
    },
    {
      type: 'add',
      path: '../{{path}}/{{dashCase name}}/{{dashCase name}}.spec.tsx',
      templateFile: 'templates/component/component.spec.template'
    }]
  });
};
