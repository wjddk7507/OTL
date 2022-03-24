/**
 * items table Manipulations
 * items 테이블에 접근합니다.
 */
const connection = require('../../config/connection').promise();

class ItemsRepository {

	async getItemsByOwnerAddress(user_address, page) {
		let sql = `
			SELECT 		item_id,
						token_id,
						author_name,
						item_title,
						item_description,
						item_hash,
						owner_address,
						on_sale_yn,
						on_use_yn,
						category_code,
						created_at
			FROM    	items_t
			WHERE		owner_address = ?
			ORDER BY    created_at DESC
		`;
		if(page) {
			sql+= `LIMIT		?, 100`;
		}
		console.debug(sql);

		return await connection.query(sql, [user_address, page])
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async getItemByTokenId(token_id) {
		let sql = `
			SELECT 		item_id,
						token_id,
						author_name,
						item_title,
						item_description,
						item_hash,
						owner_address,
						on_sale_yn,
						on_use_yn,
						category_code,
						created_at
			FROM    	items_t
			WHERE		token_id = ?
		`;
		console.debug(sql);

		return await connection.query(sql, [token_id])
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async updateItemTokenIdAndOwnerAddress(item_id, token_id, owner_address) {
		const sql = `
			update items_t
			set token_id=?, owner_address=?
			where item_id=?;
		`;
		console.debug(sql);

		return await connection.query(sql, [token_id, owner_address, item_id])
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async updateItemOwnerAddress(token_id, owner_address) {
		const sql = `
			UPDATE items_t
			SET on_sale_yn='0', on_use_yn = '0', owner_address=?
			where token_id=?
		`;
		console.debug(sql);

		return await connection.query(sql, [owner_address, token_id])
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async insertItem(item) {
		const sql = `
			INSERT INTO items_t(owner_address, author_name, item_title, item_description, category_code)
			VALUES(?, ?, ?, ?, ?);
		`;
		console.debug(sql);

		return await connection.query(sql, [item.ownerAddress, item.author_name, item.item_title, item.item_description, item.category_code])
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async getCategory() {
		const sql = `
			SELECT category_code, category_name
			FROM category_t;
		`;
		console.debug(sql);

		return await connection.query(sql)
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async getItems(page) {
		let sql = `
			SELECT 		item_id,
						token_id,
						author_name,
						item_title,
						item_description,
						item_hash,
						owner_address,
						on_sale_yn,
						on_use_yn,
						category_code,
						created_at
			FROM    	items_t
			WHERE		on_sale_yn = 1
			ORDER BY 	created_at DESC
		`;
		if(page) {
			sql+= `LIMIT	?, 100`;
		}
		console.debug(sql);

		return await connection.query(sql, [page])
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async getItemsByCategory(category_code, page) {
		let sql = `
			SELECT 		item_id,
						token_id,
						author_name,
						item_title,
						item_description,
						item_hash,
						owner_address,
						on_sale_yn,
						on_use_yn,
						category_code,
						created_at
			FROM    	items_t
			WHERE		on_sale_yn = 1 		
			AND			category_code = ?
			ORDER BY 	created_at DESC
		`;
		if(page) {
			sql+= `LIMIT	?, 100`;
		}
		console.debug(sql);

		return await connection.query(sql, [category_code, page])
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async getItemsByItemTitle(item_title, page) {
		let sql = `
			SELECT 		item_id,
						token_id,
						author_name,
						item_title,
						item_description,
						item_hash,
						owner_address,
						on_sale_yn,
						on_use_yn,
						category_code,
						created_at
			FROM    	items_t
			WHERE		on_sale_yn = 1 		
			AND			item_title LIKE ?
			ORDER BY 	created_at DESC
		`;
		if(page) {
			sql+= `LIMIT ?, 100`;
		}
		console.debug(sql);

		return await connection.query(sql, ['%'+item_title+'%', page])
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async getItemsCnt(page) {
		let sql = `
			SELECT 		COUNT(item_id) AS count
			FROM    	items_t
			WHERE		on_sale_yn = 1
			ORDER BY 	created_at DESC
		`;
		if(page) {
			sql+= `LIMIT	?, 100`;
		}
		console.debug(sql);

		return await connection.query(sql, [page])
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async getItemsByCategoryCnt(category_code, page) {
		let sql = `
			SELECT 		COUNT(item_id) AS count
			FROM    	items_t
			WHERE		on_sale_yn = 1 		
			AND			category_code = ?
			ORDER BY 	created_at DESC
		`;
		if(page) {
			sql+= `LIMIT	?, 100`;
		}
		console.debug(sql);

		return await connection.query(sql, [category_code, page])
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	async getItemsByItemTitleCnt(item_title, page) {
		let sql = `
			SELECT 		COUNT(item_id) AS count
			FROM    	items_t
			WHERE		on_sale_yn = 1 		
			AND			item_title LIKE ?
			ORDER BY 	created_at DESC
		`;
		if(page) {
			sql+= `LIMIT ?, 100`;
		}
		console.debug(sql);

		return await connection.query(sql, ['%'+item_title+'%', page])
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}

	//owner_address를 이용하여 현재 마이룸 꾸미기에 사용중인 아이템의 정보 불러오기 
	async getHomeByOwnerAddress(owner_address) {
		let sql = `
			SELECT 		token_id,
						category_code,
						x_index,
						y_index,
						z_index
			FROM    	items_t
			WHERE		on_use_yn = 1 		
			AND			owner_address = ?
			ORDER BY 	token_id DESC
		`;

		console.debug(sql);

		return await connection.query(sql, owner_address)
			.then(data => data[0])
			.catch((e) => {
				console.error(e);
				throw e;
			});
	}
}

module.exports = ItemsRepository;