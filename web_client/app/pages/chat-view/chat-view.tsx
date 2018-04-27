import * as React from "react";
import { observer } from "mobx-react";
import { MittensChat } from "models";
import { MainContentWrapper } from "components/main-content-wrapper/main-content-wrapper";
import { Button } from "components/button/button";
import FlipMove from "react-flip-move";

// CSS
import { styles, vars, css } from "styles/css";

export type ChatViewProps = {};

@observer
export class ChatView extends React.Component<ChatViewProps, {}> {
  oldHistoryLength = 0;
  scroller: HTMLDivElement;

  componentWillMount() {
    MittensChat.changeState({ goalName: "checkRegistration", exchange: 0 });
  }

  componentDidUpdate() {
    this.scroller.scrollTop = this.scroller.scrollHeight;
  }

  setScroller = (r: HTMLDivElement) => {
    this.scroller = r;
  };

  render() {
    return (
      <div className="chat" {...style.chat} ref={this.setScroller}>
        <FlipMove
          duration={500}
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end"
          }}
        >
          {MittensChat.history.map((message, i) => (
            <div
              key={i}
              {...style.block}
              {...message.person == "mittens" && style.mittensBlock}
            >
              <div
                {...style.bubble}
                {...message.person == "mittens" && style.mittens}
              >
                {message.text}
              </div>
            </div>
          ))}
          {/* !MittensChat.currentExchange.dialogueFinished && <div key={MittensChat.history.length} {...style.block} {...style.mittensBlock}><div {...style.bubble} {...style.mittens}>...</div></div> */}

          {MittensChat.dialogueFinished &&
            MittensChat.currentExchange.userInput.options && (
              <div {...style.buttons}>
                {MittensChat.currentExchange.userInput.options.map(o => {
                  return (
                    <Button
                      flex
                      css={{ margin: vars.smallSpacing }}
                      theme="secondary"
                      key={o.value}
                      action={() =>
                        MittensChat.handleUserInput(o.text, o.value)
                      }
                    >
                      {o.text}
                    </Button>
                  );
                })}
              </div>
            )}

          {MittensChat.dialogueFinished &&
            MittensChat.currentExchange.userInput.component && (
              <div style={{ padding: vars.spacing }}>
                {MittensChat.currentExchange.userInput.component}
              </div>
            )}
        </FlipMove>
      </div>
    );
  }
}

const style = styles({
  buttons: {
    borderTop: `2px solid ${vars.color.blue}`,
    display: "flex"
  },
  chat: {
    backgroundColor: vars.color.white,
    maxWidth: 600,
    margin: "auto",
    color: vars.color.font,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflowY: "auto",
    paddingTop: vars.smallSpacing
  },
  block: {
    textAlign: "right",
    marginBottom: vars.smallSpacing
  },
  mittensBlock: {
    textAlign: "left"
  },
  bubble: {
    display: "inline-block",
    padding: vars.smallSpacing,
    margin: `0 ${vars.smallSpacing}px`,
    fontSize: 16,
    borderRadius: vars.border.borderRadius,
    backgroundColor: "#eee",
    maxWidth: "70%"
  },
  mittens: {
    backgroundColor: "#F9CC82"
  }
});
