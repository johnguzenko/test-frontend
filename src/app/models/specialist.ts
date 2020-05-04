import {Shop} from './shop';

/**
 * Специалист
 */
export interface Specialist {
    /**
     * Id
     */
    id: number;
    /**
     * ФИО
     */
    fullName: string;
    /**
     * Logo в base64
     */
    logo: string;
    /**
     * Список магазинов, в которых работает специалист
     */
    shops: ReadonlyArray<Readonly<Shop>>;
}
