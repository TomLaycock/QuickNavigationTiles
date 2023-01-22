class ElementBuilder {
    currentElement = null;

    constructor(type, id, styles) {
        if (IsNullOrUndefined(type)) type = "div";

        var newElement = document.createElement(type);
        if (!IsNullOrUndefined(id)) newElement.id = id;
        if (!IsNullOrUndefined(styles)) newElement.classList.add(styles);
        this.currentElement = newElement;
        return this;
    }

    SetId(id) {
        if (!IsNullOrUndefined(id)) this.currentElement.id = id;
        return this;
    }

    AddChild(type, id = null, styles = null, stepToChild = true) {
        if (IsNullOrUndefined(type)) type = "div";

        var newElement = document.createElement(type);
        if (!IsNullOrUndefined(id)) newElement.id = id;
        if (!IsNullOrUndefined(styles)) newElement.classList.add(styles);
        this.currentElement.appendChild(newElement);
        if (stepToChild) this.currentElement = newElement;
        return this;
    }

    AddChild_StayWithParent(type, id = null, styles = null) {
        return this.AddChild(type, id, styles, false);
    }

    GoToChild_By_ClassName(name) {
        /*for (let index = 0; index < this.currentElement.childNodes.length; index++) {
            for (let classIndex = 0; classIndex < this.currentElement.childNodes[index].classList.length; classIndex++) {
                if (this.currentElement.childNodes[index].classList[classIndex] == name) {
                    this.currentElement = this.currentElement.childNodes[index];
                    return this;
                }
            }
        }*/
        let child = FindChildByClassName(this.currentElement, name);
        if (!IsNullOrUndefined(child)) this.currentElement = child;
        return this;
    }

    GoToChild_By_Id(name) {
        /*for (let index = 0; index < this.currentElement.childNodes.length; index++) {
            if (this.currentElement.childNodes[index].id = name) {
                this.currentElement = this.currentElement.childNodes[index];
                break;
            }
        }*/
        let child = FindChildById(this.currentElement, name);
        if (!IsNullOrUndefined(child)) this.currentElement = child;
        return this;
    }

    ClearClassList() {
        while (this.currentElement.classList.length > 0) {
            this.currentElement.classList.remove(this.currentElement.classList.item(0));
        }
        return this;
    }

    ReturnToRoot() {
        while (!IsNullOrUndefined(this.currentElement.parentElement)) {
            this.currentElement = this.currentElement.parentElement;
        }
        return this;
    }

    StepToParent_NTimes(times = 1) {
        for (var i = 0; i < times; i++) {
            if (!IsNullOrUndefined(this.currentElement.parentElement)) {
                this.currentElement = this.currentElement.parentElement;
            }
        }
        return this;
    }

    ReturnResult() {
        while (this.currentElement.parentElement != null) {
            this.currentElement = this.currentElement.parentElement;
        }
        return this.currentElement;
    }

    Custom(func, ...vars) {
        return func(this, ...vars);
    }
}