import axios from "axios";
import { signIn } from "./auth";

jest.mock('axios');

describe('auth.ts', () => {

    it('sign in test', async () => {
        const email = "test@test.com";
        const password = "passwd";

        axios.post = jest.fn().mockResolvedValueOnce({
            data: {
                access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwibmFtZSI6InRlc3QiLCJpYXQiOjE1MTYyMzkwMjIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSJ9.eWcrctI1J12FAh1W0u3fhQRDh6Qykx31a5yB4UoiBf4",
                refresh_token: "",
            }
        });

        const actual = await signIn(email, password);

        expect(actual.email).toBe(email);
        expect(actual.name).toBe("test");

    })

});