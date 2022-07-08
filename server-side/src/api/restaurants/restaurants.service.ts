import { Injectable } from '@nestjs/common';
import axios from "axios";
@Injectable()
export class RestaurantService {
    async findAll(req) {
        const encodedParams = new URLSearchParams();
        encodedParams.append("language", "en_US");
        encodedParams.append("limit", "10");
        encodedParams.append("location_id", "16235310");
        encodedParams.append("currency", "USD");

        const options = {
            method: 'POST',
            url: 'https://worldwide-restaurants.p.rapidapi.com/search',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': 'b1a7b7a69dmsha242ea63c685e8bp1642edjsn20e746659270',
                'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com'
            },
            data: encodedParams
        };
        try {
            const a = await axios.request(options)
            return a.data;
        }
        catch (error) {
            console.log(error);
        }
    }
}
