package book.dataItf;

import shared.GenericResponseJsonItf;

public interface BookListJsonItf extends GenericResponseJsonItf {

	BookJsonItf prepareNewEntry();

}