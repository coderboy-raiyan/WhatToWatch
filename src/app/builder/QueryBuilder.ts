import { FilterQuery, Model, Query } from 'mongoose';

type TQueryModel<T> = Query<T[], T>;

class QueryBuilder<T> {
    public QueryModel: TQueryModel<T>;
    private query: Record<string, unknown>;

    constructor(QueryModel: Model<T>, query: Record<string, unknown>) {
        this.QueryModel = QueryModel.find();
        this.query = query;
    }

    search<T>(searchAbleFields: T[]) {
        const { searchTerm } = this.query;
        if (searchTerm) {
            this.QueryModel = this.QueryModel.find({
                $or: searchAbleFields.map((field) => {
                    return {
                        [field as string]: { $regex: searchTerm, $options: 'i' },
                    };
                }),
            } as FilterQuery<T>);
        }
        return this;
    }

    filter(excludeFields = ['searchTerm', 'page', 'limit', 'sort', 'fields']) {
        const copyQueryObj = { ...this.query };
        excludeFields.forEach((field) => delete copyQueryObj[field]);
        this.QueryModel = this.QueryModel.find(copyQueryObj as FilterQuery<T>);
        return this;
    }

    paginate() {
        const page = parseInt(this?.query?.page as string) || 1;
        const limit = parseInt(this?.query?.limit as string) || 10;

        const skip = (page - 1) * limit;

        this.QueryModel = this.QueryModel.skip(skip).limit(limit);
        return this;
    }

    sort() {
        const sortField = this.query?.sort || '-createdAt';
        this.QueryModel = this.QueryModel.sort(sortField as FilterQuery<T>);
        return this;
    }

    fields() {
        const excludeFields = (this.query?.fields as string)?.split(',')?.join(' ') || '-__v';
        this.QueryModel = this.QueryModel.select(excludeFields);
        return this;
    }
}

export default QueryBuilder;
