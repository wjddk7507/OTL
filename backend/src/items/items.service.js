/**
 * Services Logics related to Digital Assets(item)
 * Service/Repository 레이어의 함수를 호출해야합니다.
 */
const ItemsRepository = require('./items.repository');
const {getS3List, deleteS3Object} = require("../../config/s3-config");
const itemRepository = new ItemsRepository();

class ItemsService {

	async checkImage(file) {
		let result;
		try {
			await getS3List().then(data => {
				result = data.filter(items => items.ETag === file.etag);
			});
			if(result.length > 1) {
				await deleteS3Object(file.key);
				return true;
			}
		} catch(e) {
			throw e;
		}
	}

	async insertItem(item) {
		try {
			const data = await itemRepository.insertItem(item);
			if(data.length != 0) {
				return {
					statusCode: 201,
					responseBody: {
						result: 'success',
						data: {item_id:data.insertId},
					}
				}
			} else {
				return {
					statusCode: 403,
					responseBody: {
						result: 'fail',
						error: error,
					}
				}
			}
		} catch(e) {
			throw e;
		}
	}

	async updateItemTokenIdAndOwnerAddress(item_id, token_id, owner_address) {
		try {
			const data = await itemRepository.updateItemTokenIdAndOwnerAddress(item_id, token_id, owner_address);
			return {
				statusCode: 201,
				responseBody: {
					result: 'success',
				}
			}
		} catch(e) {
			throw e;
		}
	}

	/**
	 * PJT Ⅱ 과제 2: 
	 * Req.2-B1 작품 목록 조회 
	 * Req.2-B2 주소가 보유한 작품 목록 조회
	 *
	 * PJT Ⅲ 과제 4: (판매 중인 작품만 반환하도록 수정합니다.)
	 * Req.4-B1 작품 목록 조회
	 * Req.4-B2 주소가 보유한 작품 목록 조회
	 */
	async getItems(address) {
		return {
			statusCode: 200,
			responseBody: {
				result: 'success',
				data: []
			}
		};
	}

	/*
	 * PJT Ⅲ 과제 3: 
	 * Req.4-B3 최근 등록 작품 조회
	 */
	async getRecentItems() {
		return {
			statusCode: 200,
			responseBody: {
				result: 'success',
				data: []
			}
		}
	}

	/**
	 * PJT Ⅱ 과제 2: 
	 * Req.2-B3 작품 상세 조회 
	 */
	async getItemByTokenId(tokenId) {
		return {
			statusCode: 200,
			responseBody: {
				result: 'success',
				data: []
			}
		};
	}


	async updateItemOwnerAddress(tokenId, ownerAddress) {
		if (await itemRepository.updateItemOwnerAddress(tokenId, ownerAddress)) {
			return {
				statusCode: 200,
				responseBody: {
					result: 'success'
				}
			};
		}
	}

	async getCategory() {
		const data = await itemRepository.getCategory();
		return {
			statusCode: 200,
			responseBody: {
				result: 'success',
				data: data,
			}
		}
	}
}

module.exports = ItemsService;