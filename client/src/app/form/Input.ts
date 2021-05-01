export abstract class Input {
  public type = 'text';
  public field = 'input';
  public placeholder = '';
  public name = '';
  public label = '';
}

export class TextInput extends Input {
  constructor(props) {
    super();
    Object.entries(props).map(([k, v]) => {
      this[k.toString()] = v;
    });
  }
}

export class Name extends TextInput {
  constructor() {
    super({
      label: 'Name',
      name: 'name',
      placeholder: 'Ex : Name',
    });
  }
}

export class FirstName extends TextInput {
  constructor() {
    super({
      label: 'First name',
      name: 'firstname',
      placeholder: 'Ex : Robert',
    });
  }
}

export class LastName extends TextInput {
  constructor() {
    super({
      label: 'Last name',
      name: 'lastname',
      placeholder: 'Ex : Cooper',
    });
  }
}

export class Phone extends TextInput {
  constructor() {
    super({
      label: 'Phone',
      name: 'phone',
      placeholder: 'Ex : +33606060606',
      type: 'tel',
    });
  }
}

export class Email extends TextInput {
  constructor() {
    super({
      label: 'Email',
      name: 'mail',
      placeholder: 'Ex : yelaa@localhost.com',
      type: 'email',
    });
  }
}

export class Password extends TextInput {
  constructor() {
    super({
      label: 'password',
      name: 'Password',
      type: 'password',
    });
  }
}
