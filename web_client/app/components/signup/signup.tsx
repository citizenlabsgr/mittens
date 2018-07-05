import * as React from "react";
import { observer } from "mobx-react";
import { Voter } from "models";
import { Link } from "components/link/link";
import { ShortInput } from "components/forms/short-input/short-input";
import { Button } from "components/button/button";
import { BirthdayInput } from "components/forms/birthday-input/birthday-input";

// CSS
import { styles, vars, css } from "styles/css";
import { MittensChat } from "models/mittens-chat/mittens-chat";

export type SignupProps = {};

@observer
export class Signup extends React.Component<SignupProps, {}> {
  state = {
    email: "",
    errors: {
      email: null as string[]
    }
  };

  setter(name: string) {
    return (value: any) => {
      this.setState({ [name]: value });
    };
  }

  submit = () => {
    this.setState({ errors: {} });
    const voter = Voter.currentUser;
    voter.email = this.state.email;
    voter
      .signUp()
      .then(r => {
        MittensChat.handleUserInput(voter.email, true);
      })
      .catch(e => {
        this.setState({ errors: e });
      });
  };

  cancel = () => {
    MittensChat.handleUserInput("No thanks", false);
  };

  render() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          this.submit();
        }}
      >
        <ShortInput
          label="Email"
          onChange={this.setter("email")}
          errors={this.state.errors.email}
          value={this.state.email}
          type="email"
          autoComplete="email"
        />

        <div
          {...style.buttons}
        >
          <Button
            theme="primary"
            action={e => {
              this.submit();
              e.preventDefault();
            }}
          >
            Remind me!
          </Button>
          <Button
            theme="secondary"
            action={e => {
              this.cancel();
              e.preventDefault();
            }}
          >
            No thanks
          </Button>
        </div>
      </form>
    );
  }
}

const style = styles({
  heading: {
    textAlign: "center",
    marginBottom: vars.spacing
  },
  note: {
    marginTop: vars.spacing,
    borderTop: vars.borderSimple,
    fontSize: 16
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row-reverse"
  }
});
