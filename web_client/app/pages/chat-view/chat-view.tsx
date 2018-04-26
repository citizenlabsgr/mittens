import * as React from "react";
import { observer } from "mobx-react";
import { MittensChat } from "models";
import { MainContentWrapper } from "components/main-content-wrapper/main-content-wrapper";
import { Button } from "components/button/button";

// CSS
import { styles, vars, css } from "styles/css";

export type ChatViewProps = {};

@observer
export class ChatView extends React.Component<ChatViewProps, {}> {
  componentWillMount() {
    MittensChat.changeState({ goalName: "checkRegistration", exchange: 0 });
  }

  render() {
    return (
      <MainContentWrapper>
        <div {...style.history}>
          {MittensChat.history.map((message, i) => (
            <div key={i}>{message.text}</div>
          ))}
          {!MittensChat.currentExchange.dialogueFinished && <div>...</div>}
        </div>
        <div>
          {MittensChat.currentExchange.dialogueFinished &&
            MittensChat.currentExchange.userInput.options &&
            MittensChat.currentExchange.userInput.options.map(o => {
              return (
                <Button
                  key={o.value}
                  action={() => MittensChat.handleUserInput(o.text, o.value)}
                >
                  {o.text}
                </Button>
              );
            })}
        </div>
        <div>
          {MittensChat.currentExchange.dialogueFinished &&
            MittensChat.currentExchange.userInput.component}
        </div>
      </MainContentWrapper>
    );
  }
}

const style = styles({
  history: {
    marginBottom: vars.spacing
  },
  button: {
    float: "right",
    marginTop: vars.smallSpacing
  }
});
