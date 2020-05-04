/**
 * Устроить специалиста в магазин
 */
export interface CreateWorkerShopReq {
    /**
     * Id-специалиста
     */
    specialistId: number;
    /**
     * Id-магазина
     */
    shopId: number;
}
