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
      <div className="chat" {...style.chat}>
        <div {...style.history}>
          {MittensChat.history.map((message, i) => (
            <div  key={i} {...style.block} {...(message.person == "mittens" && style.mittensBlock)}><div {...style.bubble} {...(message.person == "mittens" && style.mittens)}>{message.text}</div></div>
          ))}
          {!MittensChat.currentExchange.dialogueFinished && <div {...style.block} {...style.mittensBlock}><div {...style.bubble} {...style.mittens}>...</div></div>}
        </div>
        <div {...style.buttons}>
          {MittensChat.currentExchange.dialogueFinished &&
            MittensChat.currentExchange.userInput.options &&
            MittensChat.currentExchange.userInput.options.map(o => {
              return (
                <Button
                  css={{marginRight: vars.smallSpacing}}
                  theme="secondary"
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
      </div>
    );
  }
}

const style = styles({
  buttons: {
    minHeight: 50
  },
  chat: {
    backgroundColor: vars.color.white,
    maxWidth: 600,
    margin: '10px auto',
    padding: vars.spacing,
    color: vars.color.font,
    ...vars.border,
    display: 'flex',
    flexDirection: "column",
    height: '90vh',
  },
  history: {
    flex: 1,
    marginBottom: vars.spacing,
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'flex-end',
  },
  button: {
    float: "right",
    marginTop: vars.smallSpacing
  },
  block: {
    marginBottom: vars.smallSpacing,
    textAlign: "right"
  },
  mittensBlock: {
    marginBottom: vars.smallSpacing,
    textAlign: "left"
  },
  bubble: {
    display: "inline-block",
    padding: vars.smallSpacing,
    borderRadius: vars.border.borderRadius,
    backgroundColor: "#eee",
    maxWidth: "70%",
  },
  mittens: {
    backgroundColor: "#F9CC82",
  }
});
