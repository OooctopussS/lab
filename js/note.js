(function dragDrop() {
    const dragElements = document.querySelectorAll('.tab');
    let checkOrder = true;
    let ord;
    for (let index = 0; index < dragElements.length; index++)
    {
        dragElements[index].style.order = index;
        dragElements[index].draggable = true;

        dragElements[index].addEventListener('dragenter', (e) =>
        {
            if (checkOrder)
            {
                ord = e.target;
                while (ord.className != 'tab'){
                    ord = ord.parentElement;
                }
                checkOrder = false;
            }
        });

        dragElements[index].addEventListener('dragover', (e) => {
        e.preventDefault();
        });

        dragElements[index].addEventListener('drop', (e) => {
            let tmpElement = e.target;
            while (tmpElement.className != 'tab')
            {
                tmpElement = tmpElement.parentElement;
            }

            checkOrder = true;
            let tmpOrd = dragElements[index].style.order;
            dragElements[index].style.order = ord.style.order;
            ord.style.order = tmpOrd;
        });
        
    }
})();