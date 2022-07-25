import sqlstring from "sqlstring";

const queryS = (query) => {
    const offset = query.offset ? `OFFSET ${sqlstring.escape(query.offset)}` : '';

    const limit = query.limit ? `LIMIT ${sqlstring.escape(query.limit)}` : '';

    const order = query.order ? `ORDER BY ${sqlstring.escape(query.order).slice(1,-1)}" ${query.desc === 'true' ? 'DESC' : 'ASC'}` : '';

    return (offset, limit, order);
}

export default queryS;