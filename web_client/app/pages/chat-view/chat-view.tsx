import * as React from "react";
import { observer } from "mobx-react";
import { MittensChat } from "models";
import { MainContentWrapper } from "components/main-content-wrapper/main-content-wrapper";
import { Button } from "components/button/button";
import FlipMove from "react-flip-move";
const mittensUrl = require("./mittens.svg") as string;

// CSS
import { styles, vars, css } from "styles/css";
import { Spinner } from "components/spinner/spinner";

export type ChatViewProps = {};

@observer
export class ChatView extends React.Component<ChatViewProps, {}> {
  oldHistoryLength = 0;
  scroller: HTMLDivElement;

  componentWillMount() {
    MittensChat.changeState({ goalName: "registration-check", exchange: 0 });
  }

  componentDidUpdate() {
    smoothScrollToBottom(this.scroller);
  }

  setScroller = (r: HTMLDivElement) => {
    this.scroller = r;
  };

  render() {
    return (
      <div>
        <div {...style.header}>
        <a href="https://citizenlabs.org" style={{textDecoration: 'none'}}>Citizen Labs</a>
        <span style={{float: 'right', fontWeight: 'bold'}}>Vote!</span></div>
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
                  transformOrigin: "top center",
                  transform: "rotateX(-90deg)",
                  opacity: "0.1"
                },
                to: {
                  transform: ""
                }
              }}
            >
              <img key="mittens" {...style.mittensAvatar} src={mittensUrl} />
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

              <FlipMove
                duration={150}
                style={{
                  height: 70
                }}
              >
                {MittensChat.dialogueIncoming && (
                  <div key="ellipsis" {...style.ellipsis}>
                    &#8226; &#8226; &#8226;
                  </div>
                )}
              </FlipMove>
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
      </div>
    );
  }
}

const style = styles({
  header: {
    backgroundColor: vars.color.brandOrange,
    color: vars.color.white,
    padding: vars.smallSpacing,
    fontSize: 20,
    fontFamily: "helvetica neue,helvetica,sans-serif"
  },
  buttons: {
    display: "flex"
  },
  scroller: {
    overflowY: "auto",
    height: "calc(100vh - 49px)",
    backgroundColor: vars.color.white,
    maxWidth: 600,
    margin: "auto"
  },
  chat: {
    color: vars.color.font,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    paddingTop: vars.smallSpacing
  },
  mittensAvatar: {
    width: 70,
    display: "inline-block",
    textAlign: "left",
    margin: "6px 12px"
  },
  block: {
    textAlign: "right",
    marginBottom: vars.smallSpacing
  },
  mittensBlock: {
    position: "relative",
    textAlign: "left",
    ":first-of-type": {
      ":after": {
        content: "''",
        position: "absolute",
        top: -22,
        left: 12,
        borderWidth: 22,
        borderStyle: "solid",
        borderColor: "transparent",
        borderLeftColor: vars.color.theme
      }
    }
  },
  ellipsis: {
    display: "inline-block",
    padding: 22,
    margin: `0 ${vars.smallSpacing}px`,
    borderRadius: 22,
    maxWidth: "70%",
    whiteSpace: "pre-wrap",
    textAlign: "left",
    backgroundColor: "#eee",
    fontSize: 16,
    lineHeight: 0,
    color: "#aaa"
  },
  bubble: {
    display: "inline-block",
    padding: "12px 22px",
    margin: `0 ${vars.smallSpacing}px`,
    fontSize: 16,
    borderRadius: 22,
    backgroundColor: "#eee",
    maxWidth: "70%",
    whiteSpace: "pre-wrap"
  },
  mittens: {
    backgroundColor: vars.color.theme
  }
});

function smoothScrollToBottom(element: HTMLElement, speed = 0.5, step = 10) {
  const scroll = () => {
    element.scrollTop += speed * step;
    if (
      element.scrollTop <
      element.scrollHeight - element.getBoundingClientRect().height
    ) {
      setTimeout(scroll, step);
    }
  };
  scroll();
}
