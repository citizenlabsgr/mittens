What does a chat look like?

* Goals, like:
** Check if registered
** Invite friends
** See sample ballot
** Learn what to expect when voting

* Each goal is a series of exchanges;

* an exchange consists of
** optional name for key moments
** mittens dialogue [], list of strings (?)
** user input (options-only, options-with-text, or form input)
*** options only: list of buttons with names and values {name: "", value: ""} title?
*** form: react component, gets handed callback
*** text: parser combinators? look for a word? fn that takes string and returns option value
** state updater
*** function that takes current state and input value

* State is: {goal: string, exchange: number}
** should exchange be number? number OR name.

new Goal("check-registration", [
new Exchange({
  mittens: [
    "Hooray! Let's make sure you're registered to vote.",
    "I can check with the Michigan Secretary of State for you.",
    "I just need your name, birthday, and zip code."
  ],
  user: {
    component: RegistrationCheckForm
  },
  (state, value) => {
     User.current_user.do_things
     Chat.update_state({goal: state.goal, exchange: state.exchange+1})
  }
});



Chat class needs:

ChangeState
History
handleUserInput