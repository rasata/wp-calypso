Happiness Support
===============

This component renders a card for presenting our Happiness Engineer support, including buttons linking to support resources. It can  also render a button to open a Live chat window if the prop `showLiveChatButton` is `true`. 

## Usage

```js
import React from 'react';
import HappinessSupport from 'components/happiness-support';

export default () => {
    return (
        <HappinessSupport
            isJetpack
            liveChatButtonEventName="calypso_chat_button_clicked"
            showLiveChatButton
        />
    );
};
```

## Props

- *isJetpack* (boolean) – Indicates that the Happiness Support card is related to a Jetpack Plan.
- *liveChatButtonEventName* (string) – event name that will be recorded when the `HappyChatButton` is clicked.
- *showLiveChatButton* (boolean) – Whether to show a `HappyChatButton` instead of the support link `Button`
