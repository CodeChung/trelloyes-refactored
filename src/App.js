import React, { Component } from 'react';
import List from './components/List'
import './App.css';

class App extends Component {
  state = {
    lists: [
      {
        id: '1',
        header: 'First list',
        cardIds: [ 'a', 'b', 'e', 'f', 'g', 'j', 'l', 'm' ],
      },
      {
        id: '2',
        header: 'Second list',
        cardIds: ['b', 'c', 'd', 'f', 'h', 'i', 'k'],
      },
      {
        id: '3',
        header: 'Third list',
        cardIds: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm' ],
      },
      {
        id: '4',
        header: 'Fourth list',
        cardIds: [ 'l', 'm' ],
      },
    ],
    allCards: {
      'a': { id: 'a', title: 'First card', content: 'lorem ipsum' },
      'b': { id: 'b', title: 'Second card', content: 'lorem ipsum' },
      'c': { id: 'c', title: 'Third card', content: 'lorem ipsum' },
      'd': { id: 'd', title: 'Fourth card', content: 'lorem ipsum' },
      'e': { id: 'e', title: 'Fifth card', content: 'lorem ipsum' },
      'f': { id: 'f', title: 'Sixth card', content: 'lorem ipsum' },
      'g': { id: 'g', title: 'Seventh card', content: 'lorem ipsum' },
      'h': { id: 'h', title: 'Eighth card', content: 'lorem ipsum' },
      'i': { id: 'i', title: 'Ninth card', content: 'lorem ipsum' },
      'j': { id: 'j', title: 'Tenth card', content: 'lorem ipsum' },
      'k': { id: 'k', title: 'Eleventh card', content: 'lorem ipsum' },
      'l': { id: 'l', title: 'Twelfth card', content: 'lorem ipsum' },
      'm': { id: 'm', title: 'Thirteenth card', content: 'lorem ipsum' },
    },
  }
  getList = (listId) => {
    return this.state.lists.find(list => list.id === listId)
  }
  onDeleteItem = (listId, cardId) => {
    const targetList = this.getList(listId)
    const targetCards = targetList.cardIds.filter(card => card !== cardId)
    this.setState({lists: this.state.lists.map(list => {
      if (list.id === listId) {
        list.cardIds = targetCards
      }
      return list
    })})
  }
  addRandomCard = (listId) => {
    const id = Math.random().toString(36).substring(2, 4)
      + Math.random().toString(36).substring(2, 4);
    const newAllCards = this.state.allCards;
    newAllCards[id] = {
      id,
      title: `Random Card ${id}`,
      content: 'lorem ipsum',
    }
    this.setState({allCards: newAllCards})
    // why don't i have to use setstate here?
    const targetList = this.getList(listId)
    const targetCards = targetList.cardIds
    targetCards.push(id)
  }
  render() {
    const { lists } = this.state
    const { allCards } = this.state
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {lists.map(list => (
            <List
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => allCards[id])}
              listId = {list.id}
              onDeleteItem={this.onDeleteItem}
              addRandomCard={this.addRandomCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;