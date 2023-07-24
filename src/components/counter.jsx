import React from "react";

class Counter extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         count: 0
      }
      this.Increment = this.Increment.bind(this)
      this.Decrement = this.Decrement.bind(this)
   }
   render() {
      return (
         <div>
            <h1>{this.state.count}</h1>
            <button onClick={this.Increment} >Increment</button>
            <button onClick={this.Decrement}>Decrement</button>

         </div>

      )
   }
   Increment() {
      this.setState({ count: this.state.count + 1 })
   }
   Decrement() {
      this.setState({ count: this.state.count - 1 })
   }


}

export default Counter