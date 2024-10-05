export default function GameBoard({ onSelectSquare, board }) {

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, colIndex) => (
                            <li key={colIndex}>
                                {/* {playerSymbol !== null ? true : false} */}
                                <button disabled={playerSymbol !== null} onClick={() => onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                            </li>
                        ))}
                    </ol>
                </li >
            ))
            }
        </ol >
    )
}











// export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {
//     // Set the useState for clicking on the GameBoard, starting with the initialGameBoard
//     // We can now setup the initialGameBoard using gameBoard
//     // Since its default state is set to initialGameBoard until the handleSelectSquare function is run
//     const [gameBoard, setGameBoard] = useState(initialGameBoard);

//     // Handle clicking on a GameBoard square, given the rowIndex and colIndex parameters
//     // The handleSelectSquare function will be run when the button is clicked
//     function handleSelectSquare(rowIndex, colIndex) {
//         setGameBoard((prevGameBoard) => {
//             // Create a copy using JavaScripts Spread (...) operator, allows us to update the copy and not the original
//             // Updating copies instead of the original can prevent bugs where multiple things are updating the same state
//             const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];

//             // Update the board, at the current rowIndex and colIndex, with the activePlayerSymbol
//             updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
//             return updatedBoard;
//         });

//         // Run a function from outside of this function
//         // onSelectSquare, a prop for <GameBoard />, will be defined in 'App.jsx'
//         onSelectSquare();
//     }

//     return (
//         <ol id="game-board">
//             {gameBoard.map((row, rowIndex) => (
//                 <li key={rowIndex}>
//                     <ol>
//                         {row.map((playerSymbol, colIndex) => (
//                             <li key={colIndex}>
//                                 <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
//                             </li>
//                         ))}
//                     </ol>
//                 </li>
//             ))}
//         </ol>
//     )
// };