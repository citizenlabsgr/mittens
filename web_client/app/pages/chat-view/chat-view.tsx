import * as React from "react";
import { observer } from "mobx-react";
import { MittensChat } from "models";
import { MainContentWrapper } from "components/main-content-wrapper/main-content-wrapper";
import { Button } from "components/button/button";
import FlipMove from 'react-flip-move';

// CSS
import { styles, vars, css } from "styles/css";

export type ChatViewProps = {};

@observer
export class ChatView extends React.Component<ChatViewProps, {}> {
  oldHistoryLength = 0;
  scroller: HTMLDivElement

  componentWillMount() {
    MittensChat.changeState({ goalName: "checkRegistration", exchange: 0 });
  }

  componentDidUpdate() {
    if (MittensChat.history.length > this.oldHistoryLength) {
      this.scroller.scrollTop = this.scroller.scrollHeight;
    }
  }

  setScroller = (r: HTMLDivElement) => {
    this.scroller = r;
  }

  render() {
    return (
      <div className="chat" {...style.chat}>
        <div {...style.history} ref={this.setScroller}>
          <FlipMove duration={500} style={{flexGrow: 1,
              display: 'flex',
              flexDirection: "column",
              justifyContent: 'flex-end'}}>
            {MittensChat.history.map((message, i) => (
              <div key={i} {...style.block} {...(message.person == "mittens" && style.mittensBlock)}><div {...style.bubble} {...(message.person == "mittens" && style.mittens)}>{message.text}</div></div>
            ))}
            {/* !MittensChat.currentExchange.dialogueFinished && <div key={MittensChat.history.length} {...style.block} {...style.mittensBlock}><div {...style.bubble} {...style.mittens}>...</div></div> */}
          </FlipMove>
        </div>
        <div {...style.buttons}>
          <FlipMove duration={500} enterAnimation="fade" style={{margin: -vars.smallSpacing, display: 'flex'}}>
            {MittensChat.dialogueFinished &&
              MittensChat.currentExchange.userInput.options &&
              MittensChat.currentExchange.userInput.options.map(o => {
                return (
                  <Button
                    flex
                    css={{margin: vars.smallSpacing}}
                    theme="secondary"
                    key={o.value}
                    action={() => MittensChat.handleUserInput(o.text, o.value)}
                  >
                    {o.text}
                  </Button>
                );
              })}
            </FlipMove>
        </div>
        <FlipMove duration={500} enterAnimation="accordionVertical" leaveAnimation="accordionVertical" style={{padding: vars.spacing}}>
          {MittensChat.dialogueFinished &&
            MittensChat.currentExchange.userInput.component}
        </FlipMove>
      </div>
    );
  }
}

const style = styles({
  buttons: {
    minHeight: 77,
    borderTop: `2px solid ${vars.color.blue}`,
    padding: vars.smallSpacing
  },
  chat: {
    backgroundColor: vars.color.white,
    maxWidth: 600,
    margin: '10px auto',
    color: vars.color.font,
    ...vars.border,
    display: 'flex',
    flexDirection: "column",
    height: '90vh',
  },
  history: {
    padding: vars.spacing,
    flexGrow: 1,
    overflowY: "auto",
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
