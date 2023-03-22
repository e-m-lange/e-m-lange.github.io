let undoStack = [];
let redoStack = [];

//Purpose: Creates an UndoRedo item that will be added to undoStack. Has stored undo function and redo function that can be called.
function CreateUndoRedoItem(inputExecute, inputUnexecute) { //Can assign the redo and undo functions that should be executed, ideally the parameters are anonymous functions, see DragDropControl for example.
    if (inputUnexecute != null && inputExecute != null){
        var executionObj = {"reexecute": inputExecute, "unexecute": inputUnexecute};
        undoStack.push(executionObj); //Add to undo stack to be able to unexecute.
        redoStack = []; //Reset the redostack.
    }
}//cloning: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

//Purpose: Will execute the stored 'reexecute' function.
function Redo() {
    if (redoStack.length > 0){
        var func = redoStack.pop();
        func.reexecute();
        undoStack.push(func); //Add to the undostack.
    }
}

//Purpose: Will execute the stored 'unexecute' function.
function Undo() {
    if (undoStack.length > 0){
        var func = undoStack.pop();
        func.unexecute();
        redoStack.push(func);
    }
}

//Purpose: resets the undo and redo stacks to empty arrays.
function ResetUndoRedo() { //The assumption is that you reset the list every time user enters a new page
    undoStack = [];
    redoStack = [];
}