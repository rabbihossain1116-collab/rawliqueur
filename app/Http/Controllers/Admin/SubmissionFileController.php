<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class SubmissionFileController extends Controller
{
    public function show(string $path): BinaryFileResponse
    {
        $fullPath = Storage::disk('local')->path($path);

        if (! file_exists($fullPath)) {
            abort(404);
        }

        $mime = mime_content_type($fullPath);
        $size = filesize($fullPath);

        return response()->file($fullPath, [
            'Content-Type' => $mime,
            'Content-Length' => $size,
            'Content-Disposition' => 'inline',
        ]);
    }
}
