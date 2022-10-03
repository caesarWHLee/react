## Monorepo setup
This is a monorepo containing sub-packages:
- [@readr-media/react-questionnaire](https://www.npmjs.com/package/@readr-media/react-questionnaire): see [`packages/questionnaire`](https://github.com/readr-media/react/tree/main/packages/questionnaire)
- [@readr-media/react-feedback](https://www.npmjs.com/package/@readr-media/react-feedback): see [`packages/feedback`](https://github.com/readr-media/react/tree/main/packages/feedback)
- [@readr-media/react-qa-list](https://www.npmjs.com/package/@readr-media/react-qa-list): see [`packages/qa-list`](https://github.com/readr-media/react/tree/main/packages/qa-list)
- [@readr-media/react-embed-code-generator](https://www.npmjs.com/package/@readr-media/react-embed-code-generator): see [`packages/embed-code-genarator`](https://github.com/readr-media/react/tree/main/packages/embed-code-generator)

### Development
Before modifying sub-packages' source codes, make sure you install dependencies on root first.  

### Installation
`yarn install`

## Use package as react component
To use the package in a react project, we just import the react component directly from the installed package.

Here's the steps (take qa-list as example):
### Install the npm [package](https://www.npmjs.com/package/@readr-media/react-qa-list)
`yarn add @readr-media/react-qa-list`
### Import component in the desired place
```javascript
import QAList from '@readr-media/react-qa-list'

export default function SomeComponent() {
  return (
    <div>
      <OtherComponent/>
      <QAList.ReactComponent />
    </div>
  )
}
```
The export object structure may or may not be the same as the package being designed.
Always check the package's index.js (in this case: [index.js](https://github.com/readr-media/react/blob/main/packages/qa-list/src/index.js)) to know how to get the desired react component.

### Pass the required data
When we develop a package in this project, there is a convention to create a folder called *dev* in the package's root folder.
The *dev* folder is where we can run the code locally. 
If therer are some data required to pass to the component, we should always find some mock data here.

Since the react component is actually used in entry.js (in this case: [entry.js](https://github.com/readr-media/react/blob/main/packages/qa-list/dev/entry.js)). The mock data is placed here to be set to the component.
```
const mockData = [
  {
    id: '3',
    title: '如果我想換顏色或圖片怎麼辦？',
    content: {
      blocks: [
        {
          key: '1vntn',
          data: {},
          text: '這樣就可以換顏色',
          type: 'unstyled',
          depth: 0,
          entityRanges: [
            {
              key: 0,
              length: 2,
              offset: 0,
            },
          ],
          inlineStyleRanges: [],
        },
      ...
  }
]

root.render(<QAListComponent questions={mockData} />)
```
Now it's time to fetch the real data and make sure the data structure fits the mock one.
