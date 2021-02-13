const app = {
	get<P extends string>(path: P, callback: CallbackMagic<P>) {},
	delete<P>(path: string, callback: Callback<P>) {},
	post(path: string, callback: (req: any) => void) {},
	put(path: any, callback: Function) {},
};

type Params<T> = {
	params: T;
};
type Callback<T> = (req: Params<T>) => void;

//SAMPLE EXPRESS LIKE USE-CASE WITH "MANUAL" EXPLICIT TYPES
app.delete<{ ID: string }>("/something/:id", function (req) {
	console.log(req.params.ID, "NOTICE CASING ERROR ID<->id");
});

app.get("/api/user/:userID/of/:company", function (req) {
	console.log(req.params); //<-- MAGIC AUTO-INFERENCE TYPE OF params { userID: string, company: string }
});

//MAGIC TYPE PATH -> INFERENCE + STRING LITERAL + RECURSIVE TYPE THANKS TS 4.1 !!!
type ParsePathParams<Path> = Path extends `${string}/:${infer Param}/${infer Rest}`
	? { [K in Param | keyof ParsePathParams<`/${Rest}`>]: string }
	: Path extends `${string}/:${infer Param}`
	? { [K in Param]: string }
	: {};
type CallbackMagic<P> = (req: { params: ParsePathParams<P> }) => void;
