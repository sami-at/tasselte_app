class WhereClause {
    constructor(base, basequery) {
        this.base = base;
        this.basequery = basequery;
    }

    search() {
        let filterObj = {};
        if (this.basequery?.search) {
            filterObj.name = { $regex: this.basequery.search, $options: "i" };
        }

        if (this.basequery?.category) {
            filterObj.category = this.basequery.category;

        }

        this.base = this.base.find({ ...filterObj }).sort({ createdAt: -1 });
        return this;
    }


    paginator(resultPerPage) {
        const page = this.basequery.page || 1;
        const skipper = (page - 1) * resultPerPage
        this.base = this.base.find().skip(skipper).limit(resultPerPage);
        return this;
    }
}

module.exports = WhereClause;