##  Pain Points: Promises & Async

* Promises / Async — chai-as-promised helps a bit
	* make sure beforeEach block is returned a Promise that if resolved allows verifying all expectations
	* if using `eventually` make sure to return the evaluation in the it block
	* if checking multiple things in 1 it (not best practice) use `return Promise.all`.
	* setTimeouts can cause issues. use `done` arguent.
