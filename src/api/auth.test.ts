import axios from "axios";
import { emailDuplicationCheck, nameDuplicationCheck, signIn, signUp } from "./auth";

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

    });

    it('sign up test' ,async () => {
        const email = "test@test.com";
        const name = "test";
        const password = "passwd";

        axios.post = jest.fn().mockResolvedValueOnce({
            data: "OK"
        });

        const actual = await signUp(email, name, password)

        expect(actual).toBe("OK")
    });

    it('email duplication check' ,async () => {
        const email = "test@test.com";

        axios.get = jest.fn().mockResolvedValueOnce({
            data: true
        });

        const actual = await emailDuplicationCheck(email)

        expect(actual).toBe(true)
    });

    it('name duplication check' ,async () => {
        const email = "test";

        axios.get = jest.fn().mockResolvedValueOnce({
            data: true
        });

        const actual = await nameDuplicationCheck(email)

        expect(actual).toBe(true)
    });
});