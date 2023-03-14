function CreateUndoRedoBtn() {
    var undoBtnEl = createElement("button", {"id": "undoBtn", "onclick": "Undo()"});
    var vertiLineEl = createElement("div", {"class": "vertiLine"});
    var redoBtnEl = createElement("button", {"id": "redoBtn", "onclick": "Redo()"});
    var undoRedoBtnEl = createElement("div", {"id": "undoRedoBtn"}, [undoBtnEl, vertiLineEl, redoBtnEl]);

    return undoRedoBtnEl;
}