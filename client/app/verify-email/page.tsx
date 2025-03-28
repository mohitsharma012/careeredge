"use client"
import React, { useState, useEffect } from 'react';
import { Check, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { VERIFY_ACCOUNT_API } from '@/constants/api';
import { postWithOutTokenAPI } from '@/utils/apiRequest';

const EmailVerification = () => {
    const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState(true)
    const formdata = {
        email: "",
        code: ""
    }



    useEffect(() => {
        // Extract token from URL params
        const params = new URLSearchParams(location.search);
        const email = params.get('email');
        const code = params.get('code');

        if (!email || !code) {
            setVerificationStatus('error');
            setErrorMessage('Invalid verification link');
            return;
        }

        formdata.email = email;
        formdata.code = code;

        try {
            let successFn = function (result: any) {
                setVerificationStatus('success');
                toast.success(result.message);
                
            };
            let errorFn = function (error: any) {
                toast.error(error.detail.message);
                setErrorMessage('Failed to verify email. The link may have expired.');
                setVerificationStatus('error');
            };

            postWithOutTokenAPI(VERIFY_ACCOUNT_API, formdata, successFn, errorFn);
            
        } catch (error: any) {
            setVerificationStatus('error');
            toast.error("Failed to verify email. The link may have expired.");
        } finally {
            setLoading(false);
        }


       
    }, [location.search, toast]);

    const handleRedirect = () => {
        if (verificationStatus === 'success') {
            router.push("/dashboard")
            return;
        }
        router.push("/")

    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-blue-500">Email Verification</CardTitle>
                    <CardDescription>
                        Verifying your account email address
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col items-center justify-center space-y-6 py-8">
                    {verificationStatus === 'loading' && (
                        <div className="flex flex-col items-center space-y-4">
                            <Loader2 className="h-16 w-16 animate-spin text-blue-500" />
                            <p className="text-lg text-slate-600">Verifying your email address...</p>
                        </div>
                    )}

                    {verificationStatus === 'success' && (
                        <div className="flex flex-col items-center space-y-4">
                            <div className="rounded-full bg-green-100 p-4">
                                <Check className="h-12 w-12 text-green-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-green-600">Email Verified Successfully!</h2>
                            <p className="text-center text-slate-600">
                                Your email has been verified. You can now access all features of CVSynergy.
                            </p>
                        </div>
                    )}

                    {verificationStatus === 'error' && (
                        <div className="flex flex-col items-center space-y-4 w-full">
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Verification Failed</AlertTitle>
                                <AlertDescription>
                                    {errorMessage || 'Unable to verify your email. Please try again.'}
                                </AlertDescription>
                            </Alert>
                            <p className="text-center text-slate-600">
                                If you continue to have problems, please contact our support team.
                            </p>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex justify-center pb-6">
                    <Button
                        onClick={handleRedirect}
                        className="w-full max-w-xs bg-custom-darker hover:bg-custom-moreDarker text-white"
                        disabled={verificationStatus === 'loading'}
                    >
                        {verificationStatus === 'success'
                            ? 'Continue to Dashboard'
                            : 'Back to Home'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default EmailVerification;