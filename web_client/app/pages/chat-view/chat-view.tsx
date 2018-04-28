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
    smoothScrollToBottom(this.scroller);
  }

  setScroller = (r: HTMLDivElement) => {
    this.scroller = r;
  };

  render() {
    return (
      <div {...style.scroller} ref={this.setScroller}>
        <div className="chat" {...style.chat}>
          <FlipMove
            duration={500}
            style={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end"
            }}
            leaveAnimation="fade"
            enterAnimation={{
              from: {
                transformOrigin: 'top center',
                transform: 'rotateX(-90deg)',
                opacity: "0.1"
              },
              to: {
                transform: '',
              },
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

            {MittensChat.dialogueFinished &&
              MittensChat.inputButtons && (
                <div {...style.buttons}>
                  {MittensChat.inputButtons.map(o => {
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
              MittensChat.inputComponent && (
                <div style={{ padding: vars.smallSpacing }}>
                  {MittensChat.inputComponent}
                </div>
              )}
          </FlipMove>
        </div>
      </div>
    );
  }
}

const style = styles({
  buttons: {
    display: "flex"
  },
  scroller: {
    overflowY: "auto",
    height: "100vh",
    backgroundColor: vars.color.white,
    maxWidth: 600,
    margin: "auto",
  },
  chat: {
    color: vars.color.font,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
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
    maxWidth: "70%",
    whiteSpace: "pre-wrap"
  },
  mittens: {
    backgroundColor: "#F9CC82"
  }
});


function smoothScrollToBottom(element: HTMLElement, speed=.5, step=10) {
  const scroll = () => {
    element.scrollTop += speed * step;
    if (element.scrollTop < element.scrollHeight - element.getBoundingClientRect().height) {
      setTimeout(scroll, step);
    }
  }
  scroll();
}
