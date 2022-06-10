# React-use-document-visibility

This hook checks whether the browser tab the user is currently on is active
and how many times the user has left the page. Also provides a function where you can subscribe to changes in tab activity.

## Example

```jsx
import React, {useEffect} from 'react'
import { useDocumentVisibility } from '@kokojer/react-use-document-visibility'

const Page = () => {
    const { count, visible, onVisibilityChange } = useDocumentVisibility();

    useEffect(() => {
        onVisibilityChange((isVisible) => {
            console.log('first handler', isVisible)
        });
        onVisibilityChange((isVisible) => {
            console.log('second handler', isVisible)
        });
    }, [])

    return (
        <div>
          <span>
            You have left the page {count} times
            Is the tab active? {visible ? 'Yes' : 'No'}
          </span>
        </div>
    );
};
```